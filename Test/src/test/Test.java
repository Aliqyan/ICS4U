package test;

import java.util.ArrayList;

public class Test {

	public static void main(String[] args) {
		int[] nums = {5,15,-10,10,-5,40,10};
		int [] sln = new int[nums.length+1];
		
		sln[0] = 0;
		sln[1] = nums[0];
		
		ArrayList<Integer> subArray = new ArrayList<Integer>();
		subArray.add(nums[0]);
		for (int i = 2; i < sln.length; i++) {
			if (sln[i-1] + nums[i-1] > nums[i-1]) {
				sln[i] = sln[i-1] + nums[i-1];
				subArray.add(nums[i-1]);
			} else if (sln[i-1] + nums[i-1] < nums[i-1]) {
				sln[i] = nums[i-1];
				subArray.clear();
				subArray.add(nums[i-1]);
			}
			
		}
		
		System.out.println(sum(subArray));
		

	}

	private static int sum(ArrayList<Integer> subArray) {
		int sum = 0;
		for (int i = 0; i < subArray.size(); i++) {
			sum += subArray.get(i);
		}
		return sum;
	}
	

}