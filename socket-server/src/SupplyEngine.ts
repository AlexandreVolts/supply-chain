export class SupplyEngine
{
    private static readonly START_VALUE = 3;
    private static readonly VARIATION = 3;
    private static readonly MIN_STRESS_DAY = 6;
    private static readonly STRESS_DAY_VARIATION = 3;
    private static readonly STRESS_DAY_RAIO = 1.5;
    private level = 0;
    private stressDay = SupplyEngine.generateStressDay();

    private static generateStressDay()
    {
        return (SupplyEngine.MIN_STRESS_DAY + ~~(Math.random() * SupplyEngine.STRESS_DAY_VARIATION));
    }
    
    public generate():number
    {
        const variation = ~~(Math.random()) * (SupplyEngine.VARIATION + this.level / 5);
        const stressDayRatio = this.level === this.stressDay ? SupplyEngine.STRESS_DAY_RAIO : 1;

        if (this.level === this.stressDay)
            this.stressDay = this.level + SupplyEngine.generateStressDay();
        this.level++;
        return ((this.level + SupplyEngine.START_VALUE + variation) * stressDayRatio);
    }
}