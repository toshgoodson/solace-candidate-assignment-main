{
	description = "Solace assignment dev environment";
	inputs = { 
		nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";
		nixpkgs-unstable.url = "github:nixos/nixpkgs/master";
		flake-utils.url = "github:numtide/flake-utils";
	};

	outputs = { self, nixpkgs, nixpkgs-unstable, flake-utils }:
		flake-utils.lib.eachDefaultSystem (system:
			let 
				pkgs = nixpkgs.legacyPackages.${system}.pkgs;
				unstable = nixpkgs-unstable.legacyPackages.${system}.pkgs;
			in {
				devShells.default = pkgs.mkShell {
					name = "Solace assignment dev environment";
					buildInputs = with pkgs; [
						colima
						docker_28
					];
				};
			}
		);
}
