import React from "react";
import { Alert, Flex, Spin } from "antd";

function Loading({ children, loading, error }) {
    return (
        <>
            {loading ? (
                <Flex gap="middle" vertical>
                    <Flex gap="middle">
                        <Spin fullscreen tip="Loading" size="large">
                            <div/>
                        </Spin>
                    </Flex>
                </Flex>
            ) : error ? (
                <p>{error}</p>
            ) : (
                children
            )}
        </>
    );
}

export default Loading;
