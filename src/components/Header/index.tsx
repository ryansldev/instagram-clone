import Link from "next/link";
import InstagramLogo from "../InstagramLogo";
import PlusIcon from "../PlusIcon";
import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link passHref href="/">
        <InstagramLogo />
      </Link>
      <button type="button">
        <PlusIcon />
      </button>
    </header>
  )
}

export default Header;