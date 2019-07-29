export class MathUtil {

    /**
     * 返回方位[min,min)
     * @param min 最小
     * @param max 最大范围
     */
    public static random(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

}