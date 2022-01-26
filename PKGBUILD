pkgname="onelab-control-service"
pkgver=0.1.0
pkgrel=1
pkgdesc="KOOMPI OneLab Control"
arch=("x86_64")
url="https://www.koompi.com"
license=("GPL3")
source=("${pkgbase}::git+https://github.com/mrrbrilliant/mvp.git")
depends=("nodejs" "npm" "x11vnc" "tigervnc" "docker" "docker-compose" "fuse")
sha256sums=('SKIP')



package() {
    mkdir -p ${pkgdir}/opt/
    cp -r ${srcdir}/${pkgbase}/file-server ${pkgdir}/opt/${pkgname}
    cd ${pkgdir}/opt/${pkgname}
    npm install

    mkdir -p ${pkgdir}/etc/systemd/user
    install -Dm644 ${srcdir}/${pkgbase}/services/file-server.service ${pkgdir}/etc/systemd/user/onelab-file-server.service
    install -Dm644 ${srcdir}/${pkgbase}/vnc.service ${pkgdir}/etc/systemd/user/onelab-vnc.service

    mkdir -p ${pkgdir}/usr/share/applications
    install -Dm755 ${srcdir}/${pkgbase}/onelab-student.desktop ${pkgdir}/usr/share/applications
    install -Dm755 ${srcdir}/${pkgbase}/onelab-teacher.desktop ${pkgdir}/usr/share/applications

}