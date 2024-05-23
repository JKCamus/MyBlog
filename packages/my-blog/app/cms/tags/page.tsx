import { getAllTags } from "@/lib/prismaClientUtils"
import { Table, TableProps } from "antd"

interface TagsDataType {
  key: string
  tagName: string,
  tagId:string
}

const columns: TableProps<TagsDataType>['columns'] = [

  {
    title: 'TagID',
    dataIndex: 'tagId',
    key: 'TagID',
  },
  {
    title: 'tagName',
    dataIndex: 'tagName',
    key: 'tagName',
  },
]

const TagsPage: React.FC = async () => {
  const tags = await getAllTags()

  const tagsData: TagsDataType[] = tags.map((item) => ({
    key: item.id,
    tagName: item.tagName,
    tagId:item.id
  }))

  return <Table columns={columns} dataSource={tagsData} />
}



export default TagsPage;
