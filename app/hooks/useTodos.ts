import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { Todo } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up Firebase listener...');
    
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Received Firestore update:', snapshot.docs.length, 'todos');
      
      const newTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Todo[];
      
      setTodos(newTodos);
      setLoading(false);
    }, (error) => {
      console.error('Firestore error:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (data: Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Adding todo:', data);
      await addDoc(collection(db, 'todos'), {
        ...data,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await updateTodo(id, { completed });
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  };
}; 