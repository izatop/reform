module.exports = {
    "babel": async (options) => {
        const {presets} = options;
        const result = presets.find(([file]) => file.includes("@babel/preset-react"));
        if (result) {
            const [, config = {}] = result;
            result[1] = {...config, throwIfNamespace: false};
        }

        return options;
    },
    "stories": [
        "../packages/**/*.stories.tsx",
    ],
    "addons": [
        "@storybook/addon-docs",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-scss"
    ]
}
