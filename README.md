## Hi there 👋

<!--
**Joker-He/Joker-He** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
<!-- json-server的使用 json-server 是一个简单易用的工具，可快速搭建 RESTful API 服务器，使用 JSON 文件作为数据存储 -->

1. 安装 `json-server`：

   ```bash
   npm install -g json-server
   ```

2. 创建一个 JSON 文件来存储模拟数据，例如创建一个名为 `db.json` 的文件，内容如下：

   ```json
   {
     "posts": [
       {
         "id": 1,
         "title": "JSON Server 入门",
         "content": "这是关于 JSON Server 的入门介绍"
       },
       {
         "id": 2,
         "title": "JSON Server 进阶",
         "content": "深入了解 JSON Server 的高级用法"
       }
     ],
     "comments": [
       {
         "id": 1,
         "postId": 1,
         "text": "很棒的入门文章！"
       }
     ]
   }
   ```

3. 在终端中，使用以下命令启动 `json-server` 并指定数据文件：

```bash
json-server --watch db.json
```

--watch 选项表示监听 db.json 文件的变化，当文件内容发生改变时，服务器会自动重新加载数据。

4. 如果你想使用不同的端口，可以使用 `--port` 选项：

```bash
json-server --watch db.json --port 5000
```

5. 启动服务器后，你可以使用各种工具（如浏览器、Postman、curl 等）对 API 进行请求。
