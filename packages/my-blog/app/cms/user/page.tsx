import { getAllUsers } from '@/lib/prismaClientUtils'
import { Table, type TableProps } from 'antd'

interface UserDataType {
  key: string
  userName: string
}

const columns: TableProps<UserDataType>['columns'] = [
  {
    title: 'userName',
    dataIndex: 'userName',
    key: 'userName',
  },
]

const UserPage: React.FC = async () => {
  const user = await getAllUsers()

  const userData: UserDataType[] = user.map((item) => ({
    key: item.userName,
    userName: item.userName,
  }))

  return <Table columns={columns} dataSource={userData} />
}

export default UserPage
