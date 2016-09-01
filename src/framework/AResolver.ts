export abstract class AResolver {
    protected objects = {};

    protected cache(generateObject:() => any) {
        var self = this;
        
        let object = generateObject();

        if(!(object.constructor.name in self.objects)) {
            self.objects[object.constructor.name] = object;
        }

        return self.objects[object.constructor.name];
    }
}