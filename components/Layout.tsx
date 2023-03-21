import React from 'react'

type Props = {}

// this file is for Navbar
export default function Layout(props: any) {
    return (
        <>
            <h1 className="text-rose-500 text-6xl">Book Store</h1>
            {props.children}
        </>
    )
}