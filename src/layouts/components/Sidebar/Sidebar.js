import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import config from '@/config';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '@/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '@/components/SuggestedAccounts';
import * as userService from '@/services/userService';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const PER_PAGE = 5;

function Sidebar() {
    const [SuggestedUsers, setSuggestedUser] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser((prevUsers) => [...prevUsers, ...data]);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    title="Manager Account"
                    to={config.routes.managerAccount}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={SuggestedUsers} />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
