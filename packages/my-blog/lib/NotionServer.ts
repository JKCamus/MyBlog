import { Client } from '@notionhq/client'

const auth = process.env.NOTION_AUTH

const database = process.env.NOTION_DATABASE_ID ?? ''

type Question = any

export default class NotionService {
  client: Client

  constructor() {
    this.client = new Client({ auth })
  }

  async query(): Promise<Question[]> {
    const response = await this.client.databases.query({
      database_id: database,
    })

    return response.results.map((item) => NotionService.transformer(item))
  }

  async detail(id: string): Promise<Question> {
    const response = await this.client.pages.retrieve({
      page_id: id,
    })

    return response
  }

  private static transformer(page: any): Question {
    let data: any = {}

    for (const key in page.properties) {
      switch (page.properties[key].type) {
        case 'relation':
          data[key] = page.properties[key].relation[0].id
          break

        case 'title':
        case 'rich_text':
          data[key] = page.properties[key][page.properties[key].type][0].text.content
          break

        default:
          data[key] = page.properties[key]
          break
      }
    }

    return data
  }
}
