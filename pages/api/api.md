1. 获取所有的标签
GET https://api.suibiji.com/api/v2/tags

```json
{
    "tags": [
        {
            "id": "62a0d2a3ea96f0dabc61e62b",
            "name": "test",
            "etag": "ayn55tyg",
            "createdTime": "2022-06-08T16:47:32+0000",
            "modifiedTime": "2022-06-08T16:47:32+0000"
        }
    ]
}
```

2. 创建标签
POST https://api.suibiji.com/api/v2/tag
```json
{
    "name" : "test"
}
```

3. 改名标签
PUT https://api.suibiji.com/api/v2/tag
```json
{
    "id": "62a23db0e4b072498345108b",
    "etag": "ldfdfdf",
    "name" : "test"
}
```

4. 删除标签 
DELETE https://api.suibiji.com/api/v2/tag/62a0e48ae4b072498345108a

---

2. 获取所有笔记列表
GET https://api.suibiji.com/api/v2/folder/all/notes?sortBy=modifiedTime&offset=0&_=1654706855809
```json
[
    {
    "id": "629eee7624980982866d91a1",
    "content": "红尘，有时真是令人失望",
    "attachments": [
        {
            "id": "62a0cc8e4aaca34af16d6818",
            "host": "https://files-z3-gnotes.s3.cn-north-1.amazonaws.com.cn",
            "path": "files/v2/5690/MTEzODAzOTY4d29qZHF3N2c=/202206/e6818520577744c0a4805ee6f70944b6.png",
            "size": "739585",
            "filename": "3sc9rEd.png",
            "fileType": "IMAGE",
            "createdTime": "2022-06-08T16:21:34+0000",
            "modifiedTime": "2022-06-08T16:21:34+0000"
        }
    ],
    "tags": [
        "62a0d2a3ea96f0dabc61e62b"
    ],
    "createdTime": "2022-06-07T06:21:42+0000",
    "modifiedTime": "2022-06-08T16:47:32+0000",
    "etag": "dnc37oo3"
}
]
```

3. 获取单个笔记
GET https://api.suibiji.com/api/v2/note/629eee7624980982866d91a1?_=1654707044644
```json

```

4. 保存笔记
PUT https://api.suibiji.com/api/v2/note/629eee7624980982866d91a1


5. 新建笔记
POST https://api.suibiji.com/api/v2/note

6. 删除笔记
DELETE https://api.suibiji.com/api/v1/note/fd791081b72648b68c25a21573a64a3c

7. 搜索