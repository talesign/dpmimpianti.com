{
  description = "dpmimpianti.com";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_24
          pnpm
          typescript
          typescript-language-server
          tailwindcss-language-server
          astro-language-server
          prettier
        ];
        shellHook = ''
          if [ -z "$TMUX" ]; then
            tmux set-option -g default-command "nix develop --command zsh"
            tmux new-session -s dpmimpianti -d 'nvim' \; new-window
            tmux attach-session -t dpmimpianti
          fi
        '';
      };
    };
}
