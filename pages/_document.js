import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

	render() {
		return (
			<html>
                <Head>
                    <meta charSet="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
                    />
                    <meta name="description" content="React, Next.js, Hacker News, Progressive Web Application, Server Side Rendering"/>
					<meta name="theme-color" content="#673ab7" />
					<link rel="manifest" href="/static/manifest.json" />
					<link rel="icon" href="/static/img/favicon.ico" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"/>
                    <link rel="stylesheet" href="/static/base.css"/>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@7.24.4/dist/sweetalert2.min.css"/>
					<title>Hacker News PWA</title>
				</Head>
				<body>
					<Main />
					<NextScript />
					<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js" async></script>
                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.24.4/dist/sweetalert2.all.min.js" async></script>
				</body>
			</html>
		)
	}
}