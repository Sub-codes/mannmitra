import { getUserAccounts } from "@/actions/dashboard"
import CreateAccountDrawer from "@/components/create-account-drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import AccountCard from "./_components/AccountCard"

const Dashboard = async() => {
  const accounts=await getUserAccounts();

  
  return (

<>
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

<CreateAccountDrawer>
  <Card className="hover:shadow-md transition-shadow cursor-pointer w-full h-40">
    <CardContent className="flex flex-col justify-center items-center h-full text-muted-foreground pt-5">
      <Plus className="h-10 w-10 mb-4" />
      <p className="text-sm font-medium">Create New Account</p>
    </CardContent>
  </Card>
</CreateAccountDrawer>
{accounts.success&&<>
{accounts.data.map((account) => {
  return <AccountCard key={account.id} account={account}/>
}
)}
</>}
</div>
</>
  )
}

export default Dashboard
