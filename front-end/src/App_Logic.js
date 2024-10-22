import axios from "axios";
import tagMock from "./Assets/tagMock.json";

class ApiCalls {
  constructor() {
    this.NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
    this.NOTION_TABLE_ID = import.meta.env.VITE_NOTION_TABLE_ID;
    this.NOTION_API_BASE_URL = `https://api.notion.com/v1`;
    this.NOTION_API_VERSION = import.meta.env.VITE_NOTION_VERSION;
  }

  getTableTags() {
    return import.meta.env.DEV
      ? tagMock.properties.Tags.multi_select.options
      : axios
          .get(
            `${this.NOTION_API_BASE_URL}/databases/${this.NOTION_TABLE_ID}`,
            {
              headers: {
                Authorization: `Bearer ${this.NOTION_API_KEY}}`,
                "Notion-Version": `${this.NOTION_API_VERSION}`,
              },
            }
          )
          .then((response) => {
            const tags = response.properties.Tags.multi_select.options;
            console.log(tags);
            return tags;
          })
          .catch((error) => {
            console.error(`Error:`, error);
          });
  }
}

export default ApiCalls;
