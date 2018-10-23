using System.Collections.Generic;

public class SensorData
{
    public double distance { get; set; }
    public double gyr_x { get; set; }
    public double gyr_y { get; set; }
    public double gyr_z { get; set; }

    public double acc_x { get; set; }
    public double acc_y { get; set; }
    public double acc_z { get; set; }
    public string status { get; set; }
    public double heading { get; set; }
}

public class DirectionHistory
{
    public List<double> Values { get; set; }
} 