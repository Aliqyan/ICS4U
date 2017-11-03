package com.bayviewglen.dynamicprogramming;

public class Fiboncacci {
	static int[] solutions;
	static int[] sol;

	public static void main(String[] args) {
		solutions = new int[1000];
		sol = new int [1000];
		
		for(int i = 1; i<1000; i++) {
			long a = System.currentTimeMillis();
			System.out.println("Reg:" + fib(i) + " --> " + (System.currentTimeMillis() - a));
			long b = System.currentTimeMillis();
			System.out.println("DP:" + fibDP(i) + " --> " + (System.currentTimeMillis() - b));
			long c = System.currentTimeMillis();
			System.out.println("DP2:" + fibDP2(i) + " --> " + (System.currentTimeMillis() - c));
			System.out.println("----------------------------------------------------------------");
		}

		

	}
	
	public static int fib(int n) {
		if(n==1 || n==2) {
			return 1;
		}else{
			return fib(n-2) + fib(n-1);
		}
	}
	
	public static int fibDP(int n) {
		if(n==1 || n==2) {
			return 1;
		}else if(solutions[n] !=0){
			return solutions[n];
		}else {
			solutions[n] = fibDP(n-2) + fibDP(n-1);
			return solutions[n];
		}
	}
	
	public static int fibDP2(int n) {
		sol[1] = 1;
		sol[2] = 1;
		for(int i = 3; i<=n; i++) {
			sol[i] = sol[i-1] + sol[i-2];
		}
		return sol[n];
	}

}
