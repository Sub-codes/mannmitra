import { getUserAccounts } from '@/actions/dashboard'
import React from 'react'
import AddTransactionForm from '../_components/AddTransactionForm';
import { defaultCategories } from '@/data/categories';

const CreateTransaction = async() => {
    const accounts=await getUserAccounts();


  return (
    <div className='max-w-3xl mx-auto px-5'>
      <h1 className="text-5xl gradient-title">Add Transaction</h1>
      <AddTransactionForm accounts={accounts.data}
      catogery={defaultCategories} />
    </div>
  )
}

export default CreateTransaction
