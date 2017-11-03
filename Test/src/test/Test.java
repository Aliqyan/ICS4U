package test;

public class Test {

	public static void main(String[] args) {
		int[] nums = {3 ,2, 3, 4, 2, 6, 7, 8};
		int[] slnIncrs = new int[nums.length + 1];
		int[] slnDecrs = new int[nums.length + 1];
		//two cases, one where final nums are decreasing and one where final nums 
		//are increasing, have to decide which of those is better option
		slnIncrs[0] = 0;
		slnIncrs[1] = 1;
		slnDecrs[0] = 0;
		slnDecrs[1] = 1;

		for (int i = 2; i < slnIncrs.length; i++) {
			//if the difference is possitve, final nums increasing
			if (nums[i-1] - nums[i - 2] > 0) {
				//this sln is either one more than the derc sln, since after going down go up so length up by one

				slnIncrs[i] = (slnDecrs[i - 1] + 1);
				slnDecrs[i] = slnDecrs[i - 1];

			} else if (nums[i-1] - nums[i - 2] < 0) {
				slnDecrs[i] = (slnIncrs[i - 1] + 1);
				slnIncrs[i] = slnIncrs[i - 1];

			} else {
				slnIncrs[i] = slnIncrs[i-1];
				slnDecrs[i] = slnDecrs[i-1];
			}
		}

		 System.out.println( Math.max(slnIncrs[nums.length], slnDecrs[nums.length]));   

	}

}