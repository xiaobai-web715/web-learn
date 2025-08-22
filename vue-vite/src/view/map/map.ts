class myMap {
    map: any;
    constructor() {
        this.map = new window.AMap.Map("map", {
            zoom: 13,
            center: [121.7789, 31.3102],
            resizeEnable: true
        });
    }
    createMarker(params) {
        return  new window.AMap.Marker(params);
    }
    createPolygon(params) {
        return new window.AMap.Polygon(params);
    }
    createLngLat(lng: number, lat: number) {
        return new window.AMap.LngLat(lng, lat);
    }
    createPixel(x: number, y: number) {
        return new window.AMap.Pixel(x, y);
    } 
}

export default myMap