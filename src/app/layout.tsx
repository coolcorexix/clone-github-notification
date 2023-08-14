"use client";
import React from "react";
import { Inter } from "next/font/google";
import { ConfigProvider, Layout, theme } from "antd";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";
import AppHeader from "./components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorText: "white",
              colorTextBase: "hsl(0.60,0.08,0.9)",
            },
          }}
        >
          <AppHeader />
          {children}
        </ConfigProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
