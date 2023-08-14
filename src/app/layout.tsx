"use client";
import React from "react";
import { Inter } from "next/font/google";
import { ConfigProvider, Layout, Typography, theme } from "antd";
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
          <div className="pt-8" id=" footer ">
            <Typography.Text className="w-full text-center  block">
              Made with love by <a href="https://nemothecollector.dev/">Nemo</a>
            </Typography.Text>
          </div>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
