pkgbase="onelab"
pkgname=(
    "onelab-server"
    # "onelab-file-server",
    "onelab-teacher"
    "onelab-student"
)
pkgver=0.1.0
pkgrel=1
pkgdesc="KOOMPI OneLab Control"
arch=("x86_64")
url="https://www.koompi.com"
license=("GPL3")
source=("${pkgbase}::git+https://github.com/mrrbrilliant/mvp.git")
depends=("nodejs" "npm" "x11vnc" "tigervnc" "docker" "docker-compose" "fuse")
sha256sums=('SKIP')

build() {
    cd ${srcdir}/${pkgbase}/student
    npm install
    npm run build
    cd ${srcdir}/${pkgbase}/teacher
    npm install
    npm run build
}

package_onelab-student() {
    mkdir -p ${pkgdir}/opt/onelab-student
    install -Dm755 ${srcdir}/${pkgbase}/student/out/make/*.AppImage ${pkgdir}/opt/onelab-student
}

package_onelab-teacher() {
    mkdir -p ${pkgdir}/opt/onelab-teacher
    install -Dm755 ${srcdir}/${pkgbase}/student/out/make/*.AppImage ${pkgdir}/opt/onelab-teacher
}

package_onelab-server() {
    mkdir -p ${pkgdir}/opt/
    mkdir -p ${pkgdir}/etc/onelab-server
    cp -r ${srcdir}/${pkgbase}/server ${pkgdir}/opt/onelab-server
    cd ${pkgdir}/opt/onelab-server
    npm install
    cp ${srcdir}/${pkgbase}/sample.env ${pkgdir}/opt/onelab-server/.env
    sed -i "s/..\/.env/\/etc\/onelab-server\/.env/g" ${pkgdir}/opt/onelab-server/index.js
}