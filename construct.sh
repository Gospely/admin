#sync
npm run build
zip dist.zip -r dist
rm -rf ../construction/dist.admin/*
mv dist.zip ../construction/dist.admin 
cd ../construction/dist.admin && unzip dist.zip && cd dist && mv * ../ && cd ../ && rm -rf dist.zip && rm -rf dist && git add . && git commit -a -m 'constrution' && git push -u origin master
