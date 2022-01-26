# OneLab Control

## Setup

**Database**

Copy env template as `.env`

```sh
cp sample.env .evn
```

Edit the evn file and fill all information needed

```sh
docker-compose up -d
```

**Server**

```sh
cd server
npm install
npm start
```

**Application**

Teacher

```sh
cd teacher
npm install
npm run build
```

Student

```sh
cd student
npm install
npm run build
```

After buiding both teacher and student, the AppImage is generated in {teacher,student}/out/make/*.AppImage

**Services**

```sh
makepkg
sudo pacman -U onelab-control-service**.package.tar.zst
systemctl --user enable --now onelab-file-server onelab-vnc
```
