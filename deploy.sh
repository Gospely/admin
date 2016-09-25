echo "please enter commit info："

read msg 

git pull origin master

git add .
git commit -a -m "$msg"
git push -u origin master
#sync
npm run build
ssh root@119.29.153.143 'docker exec -d gospel_admin git pull'
