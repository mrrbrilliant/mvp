pkgname="onelab-control-service"
pkgver=0.1.0
pkgrel=1
pkgdesc="KOOMPI OneLab Control"
arch=("x86_64")
url="https://www.koompi.com"
license=("GPL3")
source=("${pkgname}::git+https://github.com/mrrbrilliant/mvp.git")
depends=("nodejs" "npm" "x11vnc" "tigervnc" "docker" "docker-compose" "fuse")
sha256sums=('SKIP')

package() {
    mkdir -p ${pkgdir}/opt/
    cp -r ${srcdir}/${pkgname}/file-server ${pkgdir}/opt/${pkgname}
    cd ${pkgdir}/opt/${pkgname}
    npm install

    mkdir -p ${pkgdir}/etc/systemd/user
    install -Dm644 ${srcdir}/${pkgname}/services/file-server.service ${pkgdir}/etc/systemd/user/onelab-file-server.service
    install -Dm644 ${srcdir}/${pkgname}/services/vnc.service ${pkgdir}/etc/systemd/user/onelab-vnc.service

    mkdir -p ${pkgdir}/usr/share/applications
    install -Dm755 ${srcdir}/${pkgname}/onelab-student.desktop ${pkgdir}/usr/share/applications
    install -Dm755 ${srcdir}/${pkgname}/onelab-teacher.desktop ${pkgdir}/usr/share/applications

}