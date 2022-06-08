# local deploy: you need add .env file to ./function
# .env Document: https://cloud.tencent.com/document/product/583/44786
# TENCENT_SECRET_ID=xxxxxxxxxx
# TENCENT_SECRET_KEY=xxxxxxxx
export SERVERLESS_PLATFORM_VENDOR=tencent && tsc && sls deploy