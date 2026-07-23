import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["lucide-react", "@remixicon/react"],
	},
};

export default nextConfig;
