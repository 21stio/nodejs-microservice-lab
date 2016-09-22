export abstract class AResolver {
    protected objects:{[name: string]: any} = {};

    protected cache (name: string, generateObject:() => any) {
        let self = this;

        if (!(name in self.objects)) {
            self.objects[name] = generateObject();
        }

        return self.objects[name];
    }
}