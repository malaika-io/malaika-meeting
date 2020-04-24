import React from "react";

import {useUser} from '../lib/hooks';

const IndexPage = () => {
    const [user] = useUser();

    return (
        <main>
            <div>
                <h2>
                    Hello,
                    {' '}
                    {user ? user.name : 'stranger'}
                    !
                </h2>
                <p>Have a wonderful day.</p>
            </div>
        </main>
    );
};
export default IndexPage;
