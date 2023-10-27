declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PUBLIC_URL: string;
  }
}

declare global {
  interface Window {
    PANOLENS: typeof PANOLENS;
    THREE: typeof THREE;
}

  namespace PANOLENS {
    class Viewer {
        constructor(options: ViewerOptions);
        add(panorama: any): void;
        // ... 更多方法和属性
    }

    class ImagePanorama {
        constructor(imagePath: string);
        // ... 更多方法和属性
    }

    interface ViewerOptions {
        container: HTMLElement;
        controlButtons?: string[];
        autoRotate?: boolean;
        autoRotateActivationDuration?: number;
        autoRotateSpeed?: number;
        // ... 更多选项
    }

    // 根据需要添加更多PANOLENS相关的类和接口
}

}

declare module "uuid";
