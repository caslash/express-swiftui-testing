import { Express } from 'express';
import { readdirSync } from 'fs';
import { join, parse } from 'path';

class RouteGenerator {
    public async loadRoutes(app: Express, basePath: string, baseRoute = '/'): Promise<void> {
        const entries = readdirSync(basePath, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = join(basePath, entry.name);

            if (entry.isDirectory()) {
                const newBaseRoute = `${baseRoute}${entry.name}/`;
                await this.loadRoutes(app, entryPath, newBaseRoute);
            } else if (entry.isFile() && entry.name.endsWith('.ts')) {
                const method = parse(entry.name).name.toLowerCase();
                const routeHandler = await import(entryPath);

                // @ts-ignore
                if (app[method]) {
                    const routePath = baseRoute.endsWith('/') ? baseRoute.slice(0, -1) : baseRoute;
                    
                    // @ts-ignore
                    app[method](routePath, routeHandler.default);
                    console.log('[INFO]', `Registered route: [${method.toUpperCase()}] ${routePath}`);
                } else {
                    console.warn('[ERROR]', `Unsupported method in file: ${entry.name}`);
                }
            }
        }
    }
}

export { RouteGenerator };