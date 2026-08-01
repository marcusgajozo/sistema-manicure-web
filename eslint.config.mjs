import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactCompiler from "eslint-plugin-react-compiler";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
const localCommentsPlugin = {
  rules: {
    "no-single-line-comment": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Warn on single-line comments that are not TODO",
        },
      },
      create(context) {
        return {
          Program() {
            const sourceCode = context.sourceCode || context.getSourceCode();
            const comments = sourceCode.getAllComments();
            for (const comment of comments) {
              if (comment.type === "Line") {
                const text = comment.value.trim();
                // Ignore directives or expected commands
                if (
                  text.startsWith("eslint-") ||
                  text.startsWith("prettier-ignore") ||
                  text.startsWith("@ts-") ||
                  text.toUpperCase().startsWith("TODO:") ||
                  text.toUpperCase().startsWith("TODO ")
                ) {
                  continue;
                }
                context.report({
                  loc: comment.loc,
                  message:
                    "Uso de comentários com '//' deve se limitar a TODOs. Para anotações, use comentários de bloco (/* */).",
                });
              }
            }
          },
        };
      },
    },
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  reactYouMightNotNeedAnEffect.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "react-compiler": reactCompiler,
      "local-rules": localCommentsPlugin,
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "no-warning-comments": [
        "warn",
        {
          terms: ["fixme", "hack", "xxx"],
          location: "anywhere",
        },
      ],
      "react-compiler/react-compiler": "error",
      "local-rules/no-single-line-comment": "warn",
    },
  },
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/common/components/shadcn-ui/**",
  ]),
]);

export default eslintConfig;
