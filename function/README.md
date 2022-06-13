## Join in dev?
- clone this repo
- just pull requests
- some doc maybe help you
    - [tencent cloud funtion](https://cloud.tencent.com/document/product/583/56114)
    - [use cli deploy](https://www.serverless.com/framework/docs/providers/tencent)
    - [yml configure](https://github.com/serverless-components/tencent-scf/blob/master/docs/configure.md)

## Backend Doc
### local test
Run the command: `npm run debug`, then you can see the website and the server start on http://localhost:9000

### local deployment:

you can just run `sh ./deploy.sh`, there are some tips:
```
# local deploy: you need add .env file to ./function
# .env Document: https://cloud.tencent.com/document/product/583/44786
# TENCENT_SECRET_ID=xxxxxxxxxx
# TENCENT_SECRET_KEY=xxxxxxxx
```

Under normal circumstances, the program will be automatically deployed when you pull requests and merge to main.
