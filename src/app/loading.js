"use client";
import Loading from "../components/Global/Loading/Loading";

function LoadingPage() {
    return (
        <div className="container">
            <Loading loading={true}>loading...</Loading>
        </div>
    );
}

export default LoadingPage;
