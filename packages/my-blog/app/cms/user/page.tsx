import { getAllUsers } from '@/lib/prismaClientUtils'
import { Table, type TableProps } from 'antd'
import dayjs from 'dayjs';

interface UserDataType {
  key: string
  userName: string
  email: string | null
  createdAt: string
}

const columns: TableProps<UserDataType>['columns'] = [
  {
    title: 'userName',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
]

const UserPage: React.FC = async () => {
  const user = await getAllUsers()
  const userData: UserDataType[] = user.map((item) => ({
    key: item.id,
    userName: item.name || '',
    email: item.email,
    createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'),
  }))

  return <Table columns={columns} dataSource={userData} />
}

export default UserPage
