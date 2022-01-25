pkgbase="onelab"
pkgname=(
    "onelab-server"
    "onelab-file-server"
    "onelab-teacher"
    "onelab-student"
    "onelab-services"
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
    mkdir -p ${pkgdir}/usr/share/applications

    install -Dm755 ${srcdir}/${pkgbase}/student/out/make/*.AppImage ${pkgdir}/opt/onelab-student/onelab-student.AppImage
    install -Dm755 ${srcdir}/${pkgbase}/${pkgname}.desktop ${pkgdir}/usr/share/applications

}

package_onelab-teacher() {
    mkdir -p ${pkgdir}/opt/onelab-teacher
    mkdir -p ${pkgdir}/usr/share/applications
    # install binary
    install -Dm755 ${srcdir}/${pkgbase}/student/out/make/*.AppImage ${pkgdir}/opt/onelab-teacher/onelab-teacher.AppImage
    install -Dm755 ${srcdir}/${pkgbase}/${pkgname}.desktop ${pkgdir}/usr/share/applications
}

package_onelab-server() {
    # create directories
    mkdir -p ${pkgdir}/opt
    mkdir -p ${pkgdir}/usr/bin
    # install files to places
    install -Dm755 ${srcdir}/${pkgbase}/setup.sh ${pkgdir}/usr/bin/onelab-server-setup

    cp -r ${srcdir}/${pkgbase}/server ${pkgdir}/opt/${pkgname}
    sed -i "s/..\/.env/.\/.env/g" ${pkgdir}/opt/${pkgname}/index.js
}

package_onelab-file-server() {
    mkdir -p ${pkgdir}/opt/
    cp -r ${srcdir}/${pkgbase}/file-server ${pkgdir}/opt/${pkgname}
    cd ${pkgdir}/opt/${pkgname}
    npm install

    mkdir -p ${pkgdir}/etc/system/user
    install -Dm644 ${srcdir}/${pkgbase}/file-server.service ${pkgdir}/etc/system/user
}

package_onelab-services() {
    mkdir -p ${pkgdir}/opt/${pkgname}
    mkdir -p ${pkgdir}/etc/system/user
    # install services
    install -Dm644 ${srcdir}/${pkgbase}/vnc.service ${pkgdir}/opt/${pkgname}/onelab-vnc.service
    install -Dm644 ${srcdir}/${pkgbase}/vnc.service ${pkgdir}/etc/system/user/onelab-vnc.service
}