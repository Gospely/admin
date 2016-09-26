sh ./scripts/sync.sh
#sync
npm run build
cd ./dist && git add . && git commit -a -m 'update' && git push -u origin master
ssh root@119.29.153.143 'docker exec -d gospel_admin git pull'
