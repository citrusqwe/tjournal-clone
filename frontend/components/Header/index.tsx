import React from 'react';
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  Paper,
} from '@material-ui/core';
import styles from './Header.module.scss';
import {
  AccountCircleOutlined,
  ExpandMoreOutlined,
  Menu,
  NotificationsNoneOutlined,
  Search,
  SmsOutlined,
} from '@material-ui/icons';
import Link from 'next/link';
import { AuthDialog } from '../AuthDialog';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { PostItem } from '../../utils/api/types';
import { Api } from '../../utils/api';

const Header: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const [authVisible, setAuthVisible] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [posts, setPosts] = React.useState<PostItem[]>([]);

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  React.useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false);
    }
  }, [authVisible, userData]);

  const handleChangeInput = async (e: any) => {
    setSearchValue(e.target.value);
    try {
      const { items } = await Api().post.search({ title: e.target.value });
      setPosts(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <Menu />
        </IconButton>
        <Link href="/">
          <a className="d-flex align-center">
            <svg className={styles.logo} viewBox="0 0 24 25">
              <path fill="#e8a427" d="M0 19h8.5v6H0v-6z"></path>
              <path d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
              <path fill="rgba(0,0,0,0.15)" d="M7.5 19h1v6l-1-6z"></path>
            </svg>
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <Search />
          <input
            value={searchValue}
            onChange={handleChangeInput}
            placeholder="Поиск"
          />
          {posts.length > 0 && (
            <Paper className={styles.searchBlockPopup}>
              <List>
                {posts.map((post) => (
                  <Link key={post.id} href={`/news/${post.id}`}>
                    <a>
                      <ListItem button>{post.title}</ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>

        <Link href="/write">
          <Button variant="contained" className={styles.penButton}>
            Новая запись
          </Button>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <SmsOutlined />
        </IconButton>
        <IconButton>
          <NotificationsNoneOutlined />
        </IconButton>
        {userData ? (
          <Link href="/profile/1">
            <a className="d-flex align-center">
              <Avatar className={styles.avatar} />
            </a>
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <AccountCircleOutlined />
            Войти
          </div>
        )}
        <ExpandMoreOutlined />
      </div>
      <AuthDialog handleClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};

export default Header;
