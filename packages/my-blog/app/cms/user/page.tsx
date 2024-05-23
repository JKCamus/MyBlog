import { getAllUsers } from '@/lib/prismaClientUtils'
import { Table, type TableProps } from 'antd'

interface UserDataType {
  key: string
  username: string
}

const columns: TableProps<UserDataType>['columns'] = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
  },
]

const UserPage: React.FC = async () => {
  const user = await getAllUsers()

  const userData: UserDataType[] = user.map((item) => ({
    key: item.username,
    username: item.username,
  }))

  return <Table columns={columns} dataSource={userData} />
}

export default UserPage
