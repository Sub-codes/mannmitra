import CreateAccountDrawer from "@/components/create-account-drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

const Dashboard = () => {
  return (

<>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<CreateAccountDrawer>
  <Card className="hover:shadow-md transition-shadow cursor-pointer w-full h-40">
    <CardContent className="flex flex-col justify-center items-center h-full text-muted-foreground pt-5">
      <Plus className="h-10 w-10 mb-4" />
      <p className="text-sm font-medium">Create New Account</p>
    </CardContent>
  </Card>
</CreateAccountDrawer>
</div>
</>
  )
}

export default Dashboard
