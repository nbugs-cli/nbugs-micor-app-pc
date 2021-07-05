命令行指令

Git 全局设置
git config --global user.name "邵文健"
git config --global user.email ""

创建新版本库
git clone git@code.aliyun.com:front-end-pc-components/nbugs-web-cooperative-office-manage.git
cd nbugs-web-cooperative-office-manage
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

已存在的文件夹或 Git 仓库
cd existing_folder
git init
git remote add origin git@code.aliyun.com:front-end-pc-components/nbugs-web-cooperative-office-manage.git
git add .
git commit
git push -u origin master