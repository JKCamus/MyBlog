import { getAllUsers } from '@/lib/prismaClientUtils'
import { Table, type TableProps } from 'antd'

const UserPage: React.FC = async () => {
  const user = await getAllUsers()

  interface UserDataType {
    key: string
    username: string
  }

  const userData: UserDataType[] = user.map((item) => ({
    key: item.username,
    username: item.username,
  }))

  const columns: TableProps<UserDataType>['columns'] = [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
  ]

  return <Table columns={columns} dataSource={userData} />
}

export default UserPage
