"use client";
import { ConfigProvider } from "antd";
import { Inter } from "next/font/google";
import React from "react";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import theme from "@/theme/themeConfig";
import AppHeader from "./components/AppHeader";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>
          <AppHeader />
          {children}
        </ConfigProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
