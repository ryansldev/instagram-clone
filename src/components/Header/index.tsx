import Link from "next/link";
import InstagramLogo from "../InstagramLogo";
import UploadButton from "../Upload/UploadButton";
import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.header} id="header">
      <Link passHref href="/">
        <InstagramLogo />
      </Link>
      <UploadButton />
    </header>
  )
}

export default Header;